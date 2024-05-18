import ts, {PropertyAssignment} from "typescript";
import fp from "lodash/fp";

import {createStringLiteral, wrapAsRecord} from "./utils";
import {regexpCounter} from "../utils";

import {constants} from "../consts";
import {oas} from "../oas";

interface IOASMethodNode {
    oasMethods: string[]
    oasPath: string
}

export type OASMethodsType = (IOASMethodNode | {}) & {
    [k: string]: OASMethodsType
}

const rootPaths = oas.paths;
type RootPathsType = typeof rootPaths;

const paramsSearchRegexp = /[{}:]/gm;
const paramsSearchRegexpCount = /{.*}|:/gm;


const usageArgCheck = <
    Path extends keyof RootPathsType,
    Method extends keyof RootPathsType[Path]
>(path: string, method: string) => {
    const methodInfo = oas.paths[path as Path][method as Method]

    const pathParamsCount = regexpCounter(paramsSearchRegexp, path);

    const isPathToConverted = pathParamsCount > 0;

    const isParams = fp.getOr(0, 'parameters.length', methodInfo) - regexpCounter(paramsSearchRegexpCount, path) > 0;

    const isBody = fp.getOr(false, 'requestBody', methodInfo);

    return {
        isPathToConverted,
        isParams,
        isBody,
        isSome: isBody || isPathToConverted || isParams,
    }
}


const inputTypeCreate = (path: string, method: string) => {

    const {isSome} = usageArgCheck(path, method);

    return !isSome ? [] : [
        ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            ts.factory.createIdentifier(constants.cgNames.inputParamName),
            undefined,
            ts.factory.createTypeReferenceNode(
                ts.factory.createIdentifier(constants.fetchTsLibrary.importNames.params),
                [
                    ts.factory.createTypeReferenceNode(
                        ts.factory.createIdentifier(constants.oasType.name),
                        undefined
                    ),
                    ts.factory.createLiteralTypeNode(createStringLiteral(path)),
                    ts.factory.createLiteralTypeNode(createStringLiteral(method)),
                    ts.factory.createLiteralTypeNode(ts.factory.createFalse()),
                ]
            ),
            undefined
        )
    ];
}

const outputTypeCreate = (path: string, method: string) =>
    ts.factory.createTypeReferenceNode(
        ts.factory.createIdentifier(constants.fetchTsLibrary.importNames.response),
        [
            ts.factory.createTypeReferenceNode(
                ts.factory.createIdentifier(constants.oasType.name),
                undefined
            ),
            ts.factory.createLiteralTypeNode(createStringLiteral(path)),
            ts.factory.createLiteralTypeNode(createStringLiteral(method as string))
        ]
    )

const requestArgsCreator = (path: string, method: string) => {
    const {
        isBody,
        isParams,
        isPathToConverted
    } = usageArgCheck(path, method);

    let secondProp = [
        ts.factory.createPropertyAssignment(
            ts.factory.createIdentifier(constants.requestsLibrary.configKeys.url),
            createStringLiteral(constants.api.baseUrl)
        )
    ];

    if (isParams) {
        secondProp.push(
            ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier(constants.requestsLibrary.configKeys.queryParams),
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier(constants.cgNames.inputParamName),
                    ts.factory.createIdentifier(constants.cgNames.inputParamKeys.query),
                )
            )
        )
    }

    if (isBody) {
        secondProp.push(
            ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier(constants.requestsLibrary.configKeys.body),
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier(constants.cgNames.inputParamName),
                    ts.factory.createIdentifier(constants.cgNames.inputParamKeys.body),
                )
            )
        )
    }

    return [
        !isPathToConverted
            ? createStringLiteral(path)
            : ts.factory.createCallExpression(
                ts.factory.createIdentifier(constants.cgNames.pathReplacer),
                undefined,
                [
                    createStringLiteral(path),
                    wrapAsRecord(
                        ts.factory.createPropertyAccessExpression(
                            ts.factory.createIdentifier(constants.cgNames.inputParamName),
                            ts.factory.createIdentifier(constants.cgNames.inputParamKeys.path)
                        )
                    ),
                ]
            ),
        ts.factory.createObjectLiteralExpression(secondProp, true)
    ]
}

const pathToTree = (tree: OASMethodsType): PropertyAssignment[] => {
    const picked = fp.omit(['oasPath', 'oasMethods'], tree)

    const nest = Object.keys(picked).map((key) =>
        ts.factory.createPropertyAssignment(
            ts.factory.createIdentifier(key),
            ts.factory.createObjectLiteralExpression(
                pathToTree(picked[key]),
                true
            )
        )
    );

    let methodsArr: PropertyAssignment[] = [];

    if (Array.isArray(tree?.oasMethods)) {
        const path = tree.oasPath as string
        methodsArr = tree.oasMethods.map((method) =>
            ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier(method),
                ts.factory.createArrowFunction(
                    [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
                    undefined,
                    inputTypeCreate(path, method),
                    undefined,
                    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    ts.factory.createPropertyAccessExpression(
                        ts.factory.createParenthesizedExpression(
                            ts.factory.createAwaitExpression(
                                ts.factory.createCallExpression(
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createIdentifier(constants.requestsLibrary.name),
                                        ts.factory.createIdentifier(method),
                                    ),
                                    [outputTypeCreate(path, method)],
                                    requestArgsCreator(path, method),
                                )
                            )
                        ),
                        ts.factory.createIdentifier("data")
                    )
                )
            )
        )
    }

    return [
        ...nest,
        ...methodsArr,
    ]
}


export const apiObject = (oasMethods: OASMethodsType) =>
    ts.factory.createVariableStatement(
        [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createVariableDeclarationList(
            [
                ts.factory.createVariableDeclaration(
                    ts.factory.createIdentifier("api"),
                    undefined,
                    undefined,
                    ts.factory.createObjectLiteralExpression(
                        pathToTree(oasMethods),
                        true
                    )
                )
            ],
            ts.NodeFlags.Const
        )
    )

import ts from "typescript";

import {createStringLiteral, newLine} from "./utils";

import {constants} from "../consts";


const destructNamedClause = (names: string[] | Record<string, any>) => (
    Array.isArray(names) ? names : Object.values(names)
).map((name) => (
    ts.factory.createImportSpecifier(
        false,
        undefined,
        ts.factory.createIdentifier(name)
    )
))

export const imports = [
    ts.factory.createImportDeclaration(
        [],
        ts.factory.createImportClause(
            true,
            undefined,
            ts.factory.createNamedImports(destructNamedClause(constants.fetchTsLibrary.importNames))
        ),
        createStringLiteral(constants.fetchTsLibrary.name),
        undefined
    ),
    ts.factory.createImportDeclaration(
        [],
        ts.factory.createImportClause(
            false,
            ts.factory.createIdentifier(constants.requestsLibrary.name),
            undefined,
        ),
        createStringLiteral(constants.requestsLibrary.name),
        undefined,
    ),
    newLine,
    ts.factory.createImportDeclaration(
        [],
        ts.factory.createImportClause(
            false,
            undefined,
            ts.factory.createNamedImports(
                destructNamedClause([constants.cgNames.pathReplacer]),
            )
        ),
        createStringLiteral(constants.localStruct.modulePaths.utils),
        undefined
    ),
    newLine,
    ts.factory.createImportDeclaration(
        [],
        ts.factory.createImportClause(
            true,
            undefined,
            ts.factory.createNamedImports(
                destructNamedClause([constants.oasType.name]),
            )
        ),
        createStringLiteral(constants.oasType.path),
        undefined
    ),
]

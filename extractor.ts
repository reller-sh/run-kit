import * as fs from "node:fs";
import fp from 'lodash/fp';
import ts from 'typescript';
import _ from "lodash";

import {newLine} from "./generators/utils";
import {apiObject, OASMethodsType} from "./generators/apiObject";
import {imports} from "./generators/imports";

import {constants} from "./consts";
import {oas} from "./oas";

const pathSaver = (prev: object, value: any, key: string) => {
    return {
        ...prev,
        [key]: {
            oasMethods: fp.keys(value),
            oasPath: key
        }
    }
}

const oasMapper =
    fp.pipe(
        (o) => (_.reduce(o, pathSaver, {})),
        fp.mapKeys(
            fp.pipe(
                fp.replace(/^\/|\/$/gm, ''),
                fp.replace(/[{}]|:/gm, ''),
                fp.split('/'),
                fp.map(fp.camelCase),
                fp.join('.'),
            )
        ),
        fp.entries,
        fp.map(fp.map(fp.castArray)),
        fp.map(fp.spread(fp.zipObjectDeep)),
        fp.mergeAll,
        // fp.pick(['permissions']),
    )(oas.paths) as unknown as OASMethodsType

// console.log(JSON.stringify(oasMapper, null, 2))

const file = ts.createSourceFile(
    constants.outFile,
    "",
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
);
const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
});


const decl = ts.factory.createNodeArray([
    ...imports,
    newLine,
    apiObject(oasMapper)
])


const result = printer.printList(ts.ListFormat.MultiLine, decl, file);

fs.writeFileSync(constants.outFile, result, "utf8");

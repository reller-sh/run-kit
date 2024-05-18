import ts, {TypeNode} from "typescript";

export const newLine = ts.factory.createIdentifier('\n');

export const createStringLiteral = (name: string) => ts.factory.createStringLiteral(name, true);


export const wrapAsRecord = (
    children: ts.Expression,
    keys: TypeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    values: TypeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
) => (
    ts.factory.createAsExpression(
        children,
        ts.factory.createTypeReferenceNode(
            ts.factory.createIdentifier("Record"),
            [keys, values]
        )
    )
)
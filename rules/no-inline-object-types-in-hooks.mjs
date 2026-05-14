const HOOK_NAMES = new Set(['useQuery', 'useMutation', 'useLazyQuery'])

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow inline object types in useQuery/useMutation/useLazyQuery type arguments.',
    },
    schema: [],
    messages: {
      noInlineObjectType:
        "Avoid inline object types in {{hook}} type arguments. Extract '{{type}}' to a named type or interface.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee
        const hookName =
          callee.type === 'Identifier'
            ? callee.name
            : callee.type === 'MemberExpression' && callee.property.type === 'Identifier'
            ? callee.property.name
            : null

        if (!hookName || !HOOK_NAMES.has(hookName)) return

        const typeParams = node.typeArguments ?? node.typeParameters
        if (!typeParams) return

        for (const param of typeParams.params) {
          if (param.type === 'TSTypeLiteral') {
            const src = context.sourceCode.getText(param)
            context.report({
              node: param,
              messageId: 'noInlineObjectType',
              data: { hook: hookName, type: src },
            })
          }
        }
      },
    }
  },
}

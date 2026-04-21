const HOOK_NAMES = new Set(['useQuery', 'useMutation', 'useLazyQuery'])

export default {
  meta: {
    type: 'suggestion',
    messages: {
      noHookOutsideQueriesFile:
        "'{{hook}}' must only be used inside a queries.ts file. Wrap it in a custom hook there instead.",
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename()
    if (/queries\.(ts|tsx)$/.test(filename)) return {}

    return {
      CallExpression(node) {
        const callee = node.callee
        const hookName =
          callee.type === 'Identifier'
            ? callee.name
            : callee.type === 'MemberExpression' && callee.property.type === 'Identifier'
            ? callee.property.name
            : null

        if (hookName && HOOK_NAMES.has(hookName)) {
          context.report({ node, messageId: 'noHookOutsideQueriesFile', data: { hook: hookName } })
        }
      },
    }
  },
}

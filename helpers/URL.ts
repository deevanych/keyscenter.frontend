export namespace URLHelpers {
    export const getURLHref = (baseURL: string, path: string) => {
        try {
            const _URL = new URL(path, baseURL)

            return _URL.href
        } catch (_) {
            return path
        }
    }

    export const getBackendURLHref = (path: string) => {
        return getURLHref(useRuntimeConfig().public.backendUrl, path)
    }
}

const getParams = (params: URLSearchParams) => {
    const tags = splitParams("tags", params)
    const ingredients = splitParams("ingredients", params)
    return {tags, ingredients}
}

const splitParams = (key: string, params: URLSearchParams) => {
    return params.get(key)? params.get(key).split(",").map(value => parseInt(value)) : []
}

export default getParams

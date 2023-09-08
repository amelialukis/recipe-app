const getOptions = (arr: { id: number, name: string }[] | undefined) => {
    return arr ? arr.map(i => ({value: i.id, label: i.name})) : []
}

export default getOptions

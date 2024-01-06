const autoGenerateSlug = (title) => {
    var generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
        .replace(/^-|-$/g, '') // Remove leading and trailing dashes
        .trim() // Trim any whitespace
    console.log(generatedSlug)
    return generatedSlug
}
export default autoGenerateSlug

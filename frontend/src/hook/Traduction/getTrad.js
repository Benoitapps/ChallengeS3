const getTrad = async () => {
    const result = await fetch(`http://localhost:8888/api/traductions`, {
        method: 'GET',
    });
    console.log("result", result)
    return result.json();
};

export { getTrad };
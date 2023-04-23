export const state = {
    comments: [],
    currentUser: {},
};

export const loadData = async (fileData) => {
    try {
        const res = await fetch(fileData);
    
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    
        const data = await res.json();
    
        state.currentUser = data.currentUser;
        state.comments = data.comments;
        // console.log(data)
    } catch (error) {
        alert(error)
    }
};

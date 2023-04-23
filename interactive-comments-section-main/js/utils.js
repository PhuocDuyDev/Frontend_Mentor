export const singleCommentComponent = (currentUser, comment, parentId = '') => {
    return `<div class="comment-component grid gap-2 ${
        parentId ? 'child' : ''
    }">
                <div
                    class="comment-box relative grid grid-cols-[0.5fr_11.5fr] gap-4 p-6 rounded-xl bg-white"
                >
                    <div
                        class="comment-vote flex flex-col gap-3 items-center justify-center h-min px-2 py-3 rounded-xl bg-gray-300"
                    >
                        <button
                            class="cursor-pointer w-3 h-3 button-primary-icon"
                            type="button"
                        >
                            <svg
                                width="11"
                                height="11"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                    fill="#C5C6EF"
                                />
                            </svg>
                        </button>
                        <span class="text-primary font-bold">${
                            comment.score
                        }</span>
                        <button
                            class="cursor-pointer w-3 h-3 button-primary-icon"
                            type="button"
                        >
                            <svg
                                width="11"
                                height="3"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                                    fill="#C5C6EF"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="comment-detail flex flex-col gap-4">
                        <div class="comment-info flex items-center gap-3">
                            <div class="avatar w-8">
                                <img
                                    src="${comment.user.image.png}"
                                    alt="${comment.user.username} avatar"
                                />
                            </div>
                            <span class="comment-info-username font-bold"
                                >${comment.user.username}</span
                            >
                            <span class="comment-info-createAt text-gray-400"
                                >${comment.createdAt}</span
                            >
                        </div>
                        
                        <p class="comment-desc text-gray-400">
                            ${
                                comment.replyingTo
                                    ? `<strong class="text-primary">@${comment.replyingTo}</strong>`
                                    : ''
                            } ${comment.content}
                        </p>
                        
                        <form action="" class="grid gap-4 isFormNotEditing">
                            <textarea
                                name="comment"
                                id=""
                                cols="30"
                                rows="3"
                                class="px-6 py-2 text-neutral border-2 rounded-lg border-primary-tint focus:border-primary focus:outline-none"
                            >${comment.content}</textarea
                            >
                            <div
                                class="place-content-end flex items-center gap-2"
                            >
                                <button
                                    class="flex items-start justify-center h-min px-3 py-2 rounded-lg border border-gray-400 text-gray-400 font-bold uppercase hover:bg-gray-700 hover:text-white"
                                    type="button"
                                    data-action="cancel"
                                >
                                    <span>Cancel</span>
                                </button>
                                <button
                                    class="flex items-start justify-center h-min px-3 py-2 rounded-lg button-primary-text-only"
                                    type="button"
                                    data-id="${comment.id}"
                                    data-action="update"
                                >
                                    <span>Update</span>
                                </button>
                            </div>
                        </form>
                        
                    </div>
                    ${
                        currentUser.username === comment.user.username
                            ? `<div class='absolute top-7 right-6 flex gap-4 items-center'>
                                    <button 
                                        class='flex items-center gap-2 text-secondary font-bold button-secondary-text' 
                                        type="button" 
                                        data-id="${comment.id}"
                                        data-parent-id="${parentId}"
                                        data-action="delete"
                                    >
                                        <svg
                                            width='12'
                                            height='14'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z'
                                                fill='#ED6368'
                                            />
                                        </svg>
                                        <span>Delete</span>
                                    </button>
                                    <button 
                                        class='flex items-center gap-2 text-primary font-bold button-primary-text'
                                        type="button"
                                        data-id="${comment.id}"
                                        data-parent-id="${parentId}"
                                        data-action="edit"    
                                    >
                                        <svg
                                            width='14'
                                            height='13'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z'
                                                fill='#5357B6'
                                            />
                                        </svg>
                                        <span>Edit</span>
                                    </button>
                                </div>`
                            : `<button
                                    class='absolute top-7 right-6 flex items-center gap-2 text-primary font-bold button-primary-text'
                                    type='button'
                                    data-id="${comment.id}"
                                    data-parent-id="${parentId}"
                                    data-action="reply"
                                >
                                    <svg
                                        width='14'
                                        height='13'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z'
                                            fill='#5357B6'
                                        />
                                    </svg>
                                    <span>Reply</span>
                                </button>`
                    }
                </div>
                <!-- CASE SHOW FORM FOR REPLY -->
                <!-- END CASE SHOW FORM FOR REPLY -->
            </div>`;
};

export const singleCommentWithReplyComponent = (currentUser, comment) => {
    return `<div class="comment-component has-child">
                ${singleCommentComponent(currentUser, comment)}
                
                <div class="grid grid-cols-[0.5fr_11.5fr] gap-4 pl-6">
                    <div class="px-2 seperate">
                        <div
                            class="w-5 h-full relative after:absolute after:h-full after:w-0.5 after:bg-gray-300 after:left-1/2 after:-translate-x-1/2"
                        ></div>
                    </div>
                    <!-- CASE: CHILDREN COMMENTS -->
                    <div class="comment-list-children">
                        ${comment.replies
                            .map((commentChildren) =>
                                singleCommentComponent(
                                    currentUser,
                                    commentChildren,
                                    comment.id
                                )
                            )
                            .join(' ')}
                    </div>
                </div>
            </div>`;
};

export const spinnerComponent = (parentEl) => {
    const markup = `
    <div class="spinner">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    </div>
    `;
    parentEl.innerHtml = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
};

export const clearSpinner = (parentEl) => {
    parentEl.removeChild(document.querySelector('.spinner'));
};

export const formComment = (currentUser) => {
    return `<!-- CASE: SHOW FORM FOR COMMENT -->
                <div
                    class="reply-comment-component grid grid-cols-[0.5fr_11.5fr] gap-4 p-6 rounded-xl bg-white"
                >
                    <div class="avatar w-8">
                        <img
                            src="${currentUser.image.png}"
                            alt="${currentUser.username} avatar"
                        />
                    </div>
                    <form class="grid grid-cols-[10fr_2fr] gap-4">
                        <textarea
                            name="comment"
                            id=""
                            cols="30"
                            rows="3"
                            class="px-6 py-2 text-neutral border-2 rounded-lg border-primary-tint focus:border-primary focus:outline-none"
                        ></textarea>
                        <button
                            class="flex items-start justify-center h-min py-2 rounded-lg button-primary-text-only"
                            type="button"
                            data-action="comment"
                        >
                            <span>Send</span>
                        </button>
                    </form>
                </div>`;
};

export const formReply = (currentUser) => {
    return `<div class='reply-comment-component grid grid-cols-[0.5fr_11.5fr] gap-4 p-6 rounded-xl bg-white'>
                <div class='avatar w-8'>
                    <img src='${currentUser.image.png}' alt='${currentUser.username} avatar' />
                </div>
                <form action='' class='grid grid-cols-[10fr_2fr] gap-4'>
                    <textarea
                        name='comment'
                        id=''
                        cols='30'
                        rows='3'
                        class='px-6 py-2 text-neutral border-2 rounded-lg border-primary-tint focus:border-primary focus:outline-none'
                    ></textarea>
                    <button
                        class='flex items-start justify-center h-min py-2 rounded-lg button-primary-text-only'
                        type="button"
                    >
                        <span>Reply</span>
                    </button>
                </form>
            </div>`;
};

export const modalDelete = (commentId) => {
    return `<form
                action=""
                class="max-w-[25%] flex flex-col justify-between items-start gap-4 p-6 rounded-xl bg-white"
            >
                <h3>Delete comment</h3>
                <p>
                    Are you sure you want to delete this comment? This will remove
                    the comment and can't be undo.
                </p>
                <div class="self-stretch flex items-center justify-between gap-4">
                    <button
                        class="flex-1 flex items-start justify-center h-min px-3 py-2 rounded-lg border border-gray-400 text-gray-400 font-bold uppercase hover:bg-gray-700 hover:text-white"
                        type="button"
                        data-action="cancel"
                    >
                        <span>No, Cancel</span>
                    </button>
                    <button
                        class="flex-1 flex items-start justify-center h-min px-3 py-2 rounded-lg button-secondary-text-only"
                        type="button"
                        data-id="${commentId.id}"
                        data-parent-id="${commentId.parentId}"
                        data-action="delete"
                    >
                        <span>Yes, Delete</span>
                    </button>
                </div>
            </form>`;
};

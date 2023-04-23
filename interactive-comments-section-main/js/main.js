import * as model from './model.js';
import * as components from './utils.js';

const commentListContainer = document.querySelector('.comment-list-container');
const commentFormContainer = document.querySelector('.comment-action');

const getCommentInfo = (buttonTarget, comments) => {
    // check reply a comment reply or comment original
    let commentParentIndex = -1;
    let commentChildIndex = -1;
    let isReplies = false;
    let commentParentInfo = null;
    let commentChildInfo = null;

    if (!buttonTarget.dataset.parentId) {
        commentParentIndex = comments.findIndex(
            (comment) => comment.id == buttonTarget.dataset.id
        );
    } else {
        commentParentIndex = comments.findIndex(
            (comment) => comment.id == +buttonTarget.dataset.parentId
        );
        commentChildIndex = comments[commentParentIndex].replies.findIndex(
            (comment) => comment.id == buttonTarget.dataset.id
        );

        isReplies = true;
        commentChildInfo =
            comments[commentParentIndex].replies[commentChildIndex];
    }

    commentParentInfo = comments[commentParentIndex];

    return {
        commentParentIndex,
        commentParentInfo,
        commentChildInfo,
        isReplies,
    };
};

const showListComment = async (parentEl, currentUser, comments) => {
    try {
        // components.spinnerComponent(bodyContainer);
        let markup = `
                    ${comments
                        .map((comment) => {
                            if (comment.replies.length > 0) {
                                return components.singleCommentWithReplyComponent(
                                    currentUser,
                                    comment
                                );
                            }
                            return components.singleCommentComponent(
                                currentUser,
                                comment
                            );
                        })
                        .join(' ')}
            `;
        // components.clearSpinner(bodyContainer);
        parentEl.insertAdjacentHTML('afterbegin', markup);

        const buttonList = document.querySelectorAll('button');
        buttonList.forEach((button) =>
            button.addEventListener('click', (event) => {
                const buttonTarget = event.target.closest('button');

                // Case: New reply comment
                if (buttonTarget.dataset.action === 'reply') {
                    const commentTarget =
                        buttonTarget.closest('.comment-component');
                    let replyComponent = commentTarget.querySelector(
                        '.reply-comment-component'
                    );

                    // check if exist replyComponent => remove it
                    if (replyComponent !== null) {
                        commentTarget.removeChild(replyComponent);
                    }

                    // show reply form
                    commentTarget.insertAdjacentHTML(
                        'beforeend',
                        components.formReply(currentUser)
                    );

                    // query reply comment component again
                    replyComponent = commentTarget.querySelector(
                        '.reply-comment-component'
                    );
                    const buttonReply = replyComponent.querySelector('button');
                    const textareaReply =
                        replyComponent.querySelector('textarea');

                    // check reply a comment reply or comment original
                    const { isReplies, commentParentInfo, commentChildInfo } =
                        getCommentInfo(buttonTarget, comments);

                    if (!isReplies) {
                        textareaReply.value = `@${commentParentInfo.user.username} `;
                    } else {
                        textareaReply.value = `@${commentChildInfo.user.username} `;
                    }

                    buttonReply.addEventListener('click', () => {
                        // add reply to comment
                        const content = textareaReply.value
                            .split(' ')
                            .slice(1)
                            .join(' ');
                        commentParentInfo.replies.push({
                            id: Date.now(),
                            content: content,
                            createdAt: '1 month ago',
                            score: 0,
                            replyingTo: !isReplies
                                ? commentParentInfo.user.username
                                : commentChildInfo.user.username,
                            user: currentUser,
                        });
                        // re-render ui
                        reRender(commentListContainer, currentUser, comments);
                        return;
                    });
                }

                if (buttonTarget.dataset.action === 'edit') {
                    const commentTarget =
                        buttonTarget.closest('.comment-component');
                    const commentContent =
                        commentTarget.querySelector('.comment-desc');
                    const commentFormEdit = commentTarget.querySelector(
                        '.comment-desc + form'
                    );

                    const textareaUpdate =
                        commentFormEdit.querySelector('textarea');
                    const buttonCancel = commentFormEdit.querySelector(
                        '[data-action="cancel"]'
                    );
                    const buttonUpdate = commentFormEdit.querySelector(
                        '[data-action="update"]'
                    );

                    // Hidden comment content by adding class isEditing
                    commentContent.classList.add('isEditing');
                    // Show form edit by adding class isFormNotEditing
                    commentFormEdit.classList.remove('isFormNotEditing');

                    buttonCancel.addEventListener('click', () => {
                        // Hidden comment content by adding class isEditing
                        commentContent.classList.remove('isEditing');
                        // Show form edit by adding class isFormNotEditing
                        commentFormEdit.classList.add('isFormNotEditing');
                    });

                    // check reply a comment reply or comment original
                    const { isReplies, commentParentInfo, commentChildInfo } =
                        getCommentInfo(buttonTarget, comments);

                    buttonUpdate.addEventListener('click', () => {
                        if (!isReplies) {
                            commentParentInfo.content = textareaUpdate.value;
                        } else {
                            commentChildInfo.content = textareaUpdate.value;
                        }

                        reRender(commentListContainer, currentUser, comments);
                        return;
                    });
                }

                if (buttonTarget.dataset.action === 'delete') {
                    const modalContainer =
                        document.querySelector('.modal-delete');
                    console.log(buttonTarget.dataset);
                    modalContainer.insertAdjacentHTML(
                        'afterbegin',
                        components.modalDelete({
                            id: buttonTarget.dataset.id,
                            parentId: buttonTarget.dataset.parentId,
                        })
                    );
                    modalContainer.classList.remove('isModalNotDeleting');
                    const buttonCancel = modalContainer.querySelector(
                        '[data-action="cancel"]'
                    );
                    const buttonDelete = modalContainer.querySelector(
                        '[data-action="delete"]'
                    );

                    buttonCancel.addEventListener('click', () => {
                        // Hidden modal delete by adding class isModalNotDeleting
                        modalContainer.classList.add('isModalNotDeleting');
                        // Clear all child exist
                        modalContainer.innerHTML = '';
                    });
                    let {
                        isReplies,
                        commentParentInfo,
                        commentChildInfo,
                        commentParentIndex,
                    } = getCommentInfo(buttonTarget, comments);
                    buttonDelete.addEventListener('click', () => {
                        console.log(isReplies, commentParentInfo.id);
                        if (!isReplies) {
                            comments = comments.filter(
                                (comment) => comment.id != commentParentInfo.id
                            );
                        } else {
                            commentParentInfo.replies =
                                commentParentInfo.replies.filter(
                                    (comment) =>
                                        comment.id != commentChildInfo.id
                                );
                            comments[commentParentIndex] = commentParentInfo;
                        }

                        // Hidden modal delete by adding class isModalNotDeleting
                        modalContainer.classList.add('isModalNotDeleting');
                        // Clear all child exist
                        modalContainer.innerHTML = '';
                        reRender(commentListContainer, currentUser, comments);
                    });
                }
            })
        );
    } catch (error) {
        console.log(error);
    }
};

const reRender = (parentEl, currentUser, newComments) => {
    parentEl.innerHTML = '';
    showListComment(parentEl, currentUser, newComments);
};

const showFormComment = (parentEl, currentUser, comments) => {
    parentEl.insertAdjacentHTML(
        'afterbegin',
        components.formComment(currentUser)
    );
    // Case: New comment
    const buttonComment = document.querySelector('[data-action="comment"]');
    buttonComment.addEventListener('click', () => {
        const replyComponent = buttonComment.closest(
            '.reply-comment-component'
        );
        const textareaReply = replyComponent.querySelector('textarea');
        // add new comment
        comments.push({
            id: Date.now(),
            content: textareaReply.value,
            createdAt: '1 month ago',
            score: 0,
            user: currentUser,
            replies: [],
        });
        // re-render ui
        reRender(commentListContainer, currentUser, comments);
        return;
    });
};

(async () => {
    await model.loadData('data.json');
    const { currentUser, comments } = model.state;
    showListComment(commentListContainer, currentUser, comments);
    showFormComment(commentFormContainer, currentUser, comments);
})();

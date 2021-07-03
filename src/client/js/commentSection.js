import { async } from 'regenerator-runtime';

const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');
const delBtns = document.querySelectorAll('.delBtn');

const addComment = (text, id) => {
  const videoComment = document.querySelector('.video__comments ul');
  const newComment = document.createElement('li');
  newComment.dataset.id = id;
  newComment.className = 'video__comment';

  const icon = document.createElement('i');
  icon.className = 'fas fa-comment';

  const span = document.createElement('span');
  span.innerText = ` ${text}`;

  const delBtn = document.createElement('span');
  delBtn.innerText = ' ❌';
  delBtn.addEventListener('click', handleClick);

  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComment.prepend(newComment);
};

const deleteComment = (element) => {
  element.remove();
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector('textarea');
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === '') {
    return;
  }

  const res = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (res.status === 201) {
    textarea.value = '';
    const { newCommentId } = await res.json();
    addComment(text, newCommentId);
  }
};

const handleClick = async (event) => {
  const commentId = event.target.parentNode.dataset.id;
  const res = await fetch(`/api/comment/${commentId}/delete`);

  if (res.status == 200) {
    deleteComment(event.target.parentNode);
  }
};

delBtns.forEach((item) => {
  item.addEventListener('click', handleClick);
});

if (form) {
  form.addEventListener('submit', handleSubmit);
}

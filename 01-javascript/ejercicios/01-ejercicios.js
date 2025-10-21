async function getUppercaseTitlesByUser(userId = 1) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const posts = await res.json();
  return posts
    .filter(p => p.userId === userId)
    .map(p => p.title.toUpperCase());
}

getUppercaseTitlesByUser(2).then(data => console.log(data));
export const trending = (req, res) => res.render('home', { pageTitle: 'Home' });

export const watch = (req, res) => res.render('watch', { pageTitle: 'Watch' });

export const edit = (req, res) => res.render('edit', { pageTitle: 'Edit' });

export const search = (req, res) => res.send('search Video');

export const upload = (req, res) => res.send('upload Video');

export const deleteVideo = (req, res) => res.send('deleteVideo');

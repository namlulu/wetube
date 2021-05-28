export const trending = (req, res) => res.send('homepage for videos');

export const watch = (req, res) => {
  return res.send('Watch');
};

export const edit = (req, res) => res.send('edit Video');

export const search = (req, res) => res.send('search Video');

export const upload = (req, res) => res.send('upload Video');

export const deleteVideo = (req, res) => res.send('deleteVideo');

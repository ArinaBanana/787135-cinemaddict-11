const leadingZero = (num, size) => {
  return String(num).padStart(size, `0`);
};

const convertDuration = (allMinutes) => {
  const hours = Math.floor(allMinutes / 60);
  const hoursInMin = hours * 60;
  const minutes = allMinutes - hoursInMin;

  if (hours === 0) {
    return `${leadingZero(minutes, 2)}m`;
  }

  return `${leadingZero(hours, 2)}h ${leadingZero(minutes, 2)}m`;
};

const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    description,
    rating,
    year,
    duration,
    genre,
    commentsCount
  } = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${convertDuration(duration)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster.url}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate};

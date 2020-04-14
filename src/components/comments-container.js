const createCommentsContainerTemplate = (commentsLength) => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments <span class="film-details__comments-count">${commentsLength}</span>
      </h3>
      <ul class="film-details__comments-list"></ul>
    </section>`
  );
};

export {createCommentsContainerTemplate};

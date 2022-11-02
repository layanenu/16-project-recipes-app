import React from 'react';

export default function DoneRecipes() {
  const teste = [{
    id: 43,
    type: 'drink',
    nationality: 'Narmia',
    category: 'Lanche',
    alcoholicOrNot: 'Entorpecente',
    name: 'Pudim de pupunha',
    image: 'https://s2.glbimg.com/EmO6ZYMiInYiK60XEaVLE_Imlh8=/1200x/smart/filters:cover():strip_icc()/s01.video.glbimg.com/x720/6730852.jpg',
    doneDate: 16,
    tags: ['pasta', 'curry'],
  }];

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {teste.map((e, index) => (
        <div key={ e.name }>
          <img src={ e.image } alt="e.name" data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>{e.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{e.date}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Compartilhar

          </button>
          <p data-testid={ `${index}-${e.tags[0]}-horizontal-tag` }>{e.tags[0]}</p>
        </div>

      ))}
    </div>
  );
}

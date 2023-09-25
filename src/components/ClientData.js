function getClientData() {
    const pokemonNames = [
      'Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Meowth',
      'Psyduck', 'Snorlax', 'Dragonite', 'Mewtwo', 'Chikorita', 'Cyndaquil',
      'Totodile', 'Togepi', 'Mareep', 'Typhlosion', 'Feraligatr', 'Unown',
      'Wobbuffet', 'Girafarig', 'Shuckle', 'Swinub', 'Lugia', 'Ho-Oh',
      'Treecko', 'Torchic', 'Mudkip', 'Beautifly', 'Mightyena', 'Wurmple',
      'Gardevoir', 'Exploud', 'Kyogre', 'Groudon', 'Rayquaza', 'Turtwig',
      'Chimchar', 'Piplup', 'Luxray', 'Lucario'
    ];
    const name = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
    const color = randomColor();
    return { name, color };
  }
  
  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  }
  
  export { getClientData };
  
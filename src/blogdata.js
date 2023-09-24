const blogdata = [];

blogdata.push({
    rol: 'Guía',
    slug: 'guia',
    img: 'logoGuia',
    texto: 'Deberás observar detalladamente el mapa e indicarle al Huaquero, dónde debe buscar los misteriosos símbolos que aparecen en el mapa; tendrán que reaccionar rápido antes de que el rastro se pierda. ',
});
blogdata.push({
    rol: 'Huaquero',
    slug: 'huaquero',
    img: 'logoHuaquero',
    texto: 'Con ayuda de la cámara de tu dispositivo, escanea las símbolos encontrados los lugares claves; tócalos para guardarlos.  Enséñaselos al Intérprete para que él pueda descifrarlos. ¡Ten cuidado!, solo podrás tocar los símbolos indicados.',
});
blogdata.push({
    rol: 'Intérprete',
    slug: 'interprete',
    img: 'logoInterprete',
    texto: 'Utiliza los símbolos que el Huaquero encuentre para traducirlos. Para ello, deberás encontrar los pares de estos y solo entonces revelarás el significado de cada símbolo. ¡Ten cuidado!, no podrás revelar distintos símbolos.',
});
blogdata.push({
    rol: 'Antropólogo',
    slug: 'antropologo',
    img: 'logoAntropologo',
    texto: 'Resuelve el anagrama, ordena las palabras para desbloquear el código secreto.',
});

export { blogdata };
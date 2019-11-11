$(document).ready(function() {

class Puissance4 {
  /*
    Intialise un plateau de jeu de dimensions `rows` × `cols` (par défaut 6×7),
    et fait l'affichage dans l'élément `element_id` du DOM.
   */
  constructor(element_id, x=6, y=7) {
    // Nombre de lignes et de colonnes
    this.x = x;
    this.y = y;
    // cet tableau à deux dimensions contient l'état du jeu:
    //   0: case vide
    //   1: pion du joueur 1
    //   2: pion du joueur 2
    this.board = Array(this.x);
    for (let line = 0; line < this.x; line++) {
      this.board[line] = Array(this.y).fill(0);
    }
    // un entier: 1 ou 2 (le numéro du prochain joueur)
    this.turn = 1;
    // Nombre de coups joués
    this.moves = 0;
    /* un entier indiquant le gagnant:
        null: la partie continue
           0: la partie est nulle
           1: joueur 1 a gagné
           2: joueur 2 a gagné
    */
    this.winner = null;

    // L'élément du DOM où se fait l'affichage
    this.element = $(element_id);
    // On ajoute le gestionnaire d'événements pour gérer le click
    //
    // Pour des raisons techniques, il est nécessaire de passer comme gestionnaire
    // une fonction anonyme faisant appel à `this.handle_click`. Passer directement
    // `this.handle_click` comme gestionnaire, sans wrapping, rendrait le mot clef
    // `this` inutilisable dans le gestionnaire. Voir le "binding de this".
    $(this.element).click(function(e){
      $(this).handle_click(function(e){
        $(this).render();
      })
    }) 
    // On fait l'affichage
    

  
  /* Affiche le plateau de jeu dans le DOM */
  render() {
    let table = append('table');
    //ATTENTION, la page html est écrite de haut en bas. Les indices 
    //pour le jeu vont de bas en haut (compteur i de la boucle)
    for (let line = this.x - 1; line >= 0; line--) {
      let tr = $(table).appendChild(append('tr'));
      for (let col = 0; col < this.y; col++) {
        let td = $(tr).appendChild(append('td'));
        let colour = this.board[line][col];
        if (colour)
          td.className = 'player' + colour;
        td.dataset.column = j;
      }
    }
    this.element.innerHTML = '';
    this.element.appendChild(table);
  }
  
    set(row, column, player) {
    // On colore la case
      this.board[row][column] = player;
    // On compte le coup
    this.moves++;
    }

  /* Cette fonction ajoute un pion dans une colonne */
    play(column) {
    // Trouver la première case libre dans la colonne
    let row;
    for (let i = 0; i < this.rows; i++) {
      if (this.board[i][column] == 0) {
        row = i;
        break;
      }
    }
    if (row === undefined) {
      return null;
    } else {
      // Effectuer le coup
      this.set(row, column, this.turn);
      // Renvoyer la ligne où on a joué
      return row;
    }
    }
  
  handle_click(event) {
    // Vérifier si la partie est encore en cours
    if (this.winner !== null) {
        if (window.confirm("Game over!\n\nDo you want to restart?")) {
            this.reset();
        this.render();
            }
            return;
    }

      let column = event.target.dataset.column;
    if (column !== undefined) {
      //attention, les variables dans les datasets sont TOUJOURS 
      //des chaînes de caractères. Si on veut être sûr de ne pas faire de bêtise,
      //il vaut mieux la convertir en entier avec parseInt
      column = parseInt(column);
        let row = this.play(parseInt(column));
      
      if (row === null) {
        $("#tour-joueur").text("Column is full");
      } else {
        // Vérifier s'il y a un gagnant, ou si la partie est finie
        if (this.win(row, column, this.turn)) {
          this.winner = this.turn;
        } else if (this.moves >= this.rows * this.columns) {
          this.winner = 0;
        }
        // Passer le tour : 3 - 2 = 1, 3 - 1 = 2
        this.turn = 3 - this.turn;

        // Mettre à jour l'affichage
        this.render()
        
        //Au cours de l'affichage, pensez eventuellement, à afficher un 
        //message si la partie est finie...
        switch (this.winner) {
          case 0: 
            $("#tour-joueur").text("Draw part"); 
            break;
          case 1:
            $("#tour-joueur").text("Js Win");
            break;
          case 2:
            $("#tour-joueur").text("Jquery Win"); 
            break;
        }
      }
    }
  }

  /* 
   Cette fonction vérifie si le coup dans la case `row`, `column` par
   le joueur `player` est un coup gagnant.
   
   Renvoie :
     true  : si la partie est gagnée par le joueur `player`
     false : si la partie continue
 */
    win(row, column, player) {
        // Horizontal
    let count = 0;
    for (let j = 0; j < this.cols

});

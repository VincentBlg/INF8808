
/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  // TODO: Clean the player name data
  data.forEach(value => {
    // eslint-disable-next-line no-unused-expressions
    value.Player = value.Player.charAt(0).toUpperCase() + value.Player.slice(1).toLowerCase()
  })
  return data
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  // TODO: Find the five top players with the most lines in the play
  var players = ['Richmond', 'Sampson', 'Gregory', 'Abraham', 'Benvolio', 'Tybalt', 'First citizen', 'Capulet', 'Lady capulet', 'Montague', 'Lady montague', 'Prince', 'Romeo', 'Paris', 'Servant', 'Nurse', 'Juliet', 'Mercutio', 'First servant', 'Second servant', 'Second capulet', 'Chorus', 'Friar laurence', 'Peter', 'Lady  capulet', 'First musician', 'Second musician', 'Musician', 'Third musician', 'Balthasar', 'Apothecary', 'Friar john', 'Page', 'First watchman', 'Second watchman', 'Third watchman']
  var dict = {}

  players.forEach((p) => { dict[p] = 0 })
  data.forEach(value => {
    // eslint-disable-next-line no-unused-expressions
    dict[value.Player] += 1
  })

  const keysSorted = Object.keys(dict).sort(function (a, b) { return dict[a] - dict[b] })

  return keysSorted.slice(-5)
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  // TODO : Generate the data structure as defined above
  const acts = [1, 2, 3, 4, 5]
  const players = ['Richmond', 'Sampson', 'Gregory', 'Abraham', 'Benvolio', 'Tybalt', 'First citizen', 'Capulet', 'Lady capulet', 'Montague', 'Lady montague', 'Prince', 'Romeo', 'Paris', 'Servant', 'Nurse', 'Juliet', 'Mercutio', 'First servant', 'Second servant', 'Second capulet', 'Chorus', 'Friar laurence', 'Peter', 'Lady  capulet', 'First musician', 'Second musician', 'Musician', 'Third musician', 'Balthasar', 'Apothecary', 'Friar john', 'Page', 'First watchman', 'Second watchman', 'Third watchman']
  var output = []

  acts.forEach(act => {
    var actObject = {
      Act: act,
      Players: []
    }

    players.forEach(p => {
      var count = data.filter(element => parseInt(element.Act) === act)
        .filter(element => element.Player === p)
        .length
      actObject.Players.push({ Player: p, Count: count })
    })

    output.push(actObject)
  })
  return output
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  const realOutput = []
  data.forEach(element => {
    const output = {}
    output.Act = element.Act
    output.Players = []
    let counter = 0
    element.Players.forEach(player => {
      if (!top.includes(player.Player)) {
        counter += player.Count
      } else {
        output.Players.push(player)
      }
    })
    output.Players.push({ Player: 'Other', Count: counter })
    realOutput.push(output)
  })
  console.log(realOutput)
  return realOutput
}

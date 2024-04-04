
function minimum(int1, int2, int3){
  if (int1 < int2 && int1 < int3){
    return int1
  }
  else if (int2 < int3){
    return int2
  }
  else{
    return int3
  }
}

function levenshtein(chaine1, chaine2){
  var dist = Array(chaine1.length+1).fill().map(()=>Array(chaine2.length+1).fill(0))

  let i = 0
  let j = 0

  while (i <= chaine1.length){
    dist[i][0] = i
    i++
  }

  while (j <= chaine2.length){
    dist[0][j] = j
    j++
  }
  
  i=1
  
  while (i <= chaine1.length){
    j=1
    while (j <= chaine2.length){
      let cost = -1
      if (chaine1[i-1] === chaine2[j-1]){
        cost = 0
      }
      else{
        cost = 1
      }
      dist[i][j] = minimum(dist[i-1][j]+1, dist[i][j-1]+1, dist[i-1][j-1]+cost)
      j++
    }
    i++
  }
  return dist[chaine1.length][chaine2.length]
}
 
export default levenshtein;
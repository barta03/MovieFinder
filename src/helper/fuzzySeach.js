const fuzzySearch = (query, list) => {
  const q = query.toLowerCase();

  const filtered = list.filter((movie)=>{
    const title = (movie.title || "").toLowerCase()
    const original_title = (movie.original_title || "").toLowerCase()
    const overview = (movie.overview || "").toLowerCase()

    return isSubsequence(q,title) && isSubsequence(q,overview) && isSubsequence(q,original_title)
  })
  return filtered
};

const isSubsequence= (q,text)=>{
  let i=0
  let j=0
  while(i<q.length && j<text.length){
    if(q[i]==text[j]){
      i++
    }
    j++
  }
  return i == q.length
}



// ARC color palette (0–9)
const colors = [
  "#000000", "#0074D9", "#FF4136", "#2ECC40",
  "#FFDC00", "#AAAAAA", "#F012BE", "#FF851B",
  "#7FDBFF", "#870C25"
];

// Render a numeric 2D matrix to a table
function renderGrid(matrix, tableId){
  const table=document.getElementById(tableId);
  table.innerHTML="";
  for(let i=0;i<matrix.length;i++){
    const tr=document.createElement("tr");
    for(let j=0;j<matrix[0].length;j++){
      const td=document.createElement("td");
      td.style.backgroundColor=colors[matrix[i][j]]||"#000";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

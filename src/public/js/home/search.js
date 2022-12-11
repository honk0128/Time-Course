function filter(){

  var search, name, course, i;

  search = document.getElementById("search").search.toUpperCase();
  item = document.getElementsByClassName("course");

  for(i=0;i<item.length;i++){
    name = item[i].getElementsByClassName("course");
    if(name[0].innerHTML.toUpperCase().indexOf(search) > -1){
      item[i].style.display = "flex";
    } else{
      item[i].style.display = "none";
    }
  }
}
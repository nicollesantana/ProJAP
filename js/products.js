const ORDER_ASC_BY_COST = "$a";
const ORDER_DESC_BY_COST = "$z";
const ORDER_BY_SOLD_COUNT = "Rel.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var formulario = undefined;


function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showCategoriesList() {

    let htmlContentToAppend = "";
   
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
        
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                        
                    </div>
                    <p class="mb-1">` + category.description + `</p><br>
                    <p><b> ` + category.currency + `-` + category.cost + `</b><p>
                </div>
            </div>
        </a>
        `
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
        }
    }

}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

function search(){
     
    let htmlContentToAppend = "";
    
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];
        let cadena = category.name.toLowerCase();
       
        if (cadena.indexOf(formulario) !== -1){

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                        
                    </div>
                    <p class="mb-1">` + category.description + `</p><br>
                    <p><b> ` + category.currency + `-` + category.cost + `</b><p>
                </div>
            </div>
        </a>
        `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            sortAndShowCategories(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
      
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
        showCategoriesList();
        console.log("hasta aqui llega")
    });
   
    document.getElementById("editSearch").addEventListener("keyup", function(e){
        e.preventDefault();
        formulario = document.getElementById("editSearch").value;
       
        search();
            
    });
    document.getElementById("boton").addEventListener("click", function(e){
        e.preventDefault();
        formulario = document.getElementById("editSearch").value;
       
        search();
            
    });

});
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        let comentarios = resultObj.data;
        localStorage.setItem("datos",JSON.stringify(comentarios));
        console.log(comentarios)}
    });
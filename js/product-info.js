var productCategory = {};

function showInfoProduct(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productCategory = resultObj.data;
            console.log(productCategory)

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productCategoryHTML = document.getElementById("categoria");
        
            categoryNameHTML.innerHTML = productCategory.name;
            categoryDescriptionHTML.innerHTML = productCategory.description;
            productCountHTML.innerHTML = productCategory.cost;
            productCriteriaHTML.innerHTML = productCategory.soldCount;
            productCategoryHTML.innerHTML = productCategory.category;

            //Muestro las imagenes en forma de galería
            showInfoProduct(productCategory.images);
        }
    });

    // comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           let comentarios = resultObj.data;
            console.log(comentarios)
           
            let htmlContentToAppend = "";
       

            for(let i = 0; i < comentarios.length; i++){
                let com = comentarios[i];
        
                htmlContentToAppend += `
                
                <ul id="comments-list" class="comments-list">
                <li>
                  <div class="mail-level">
                   <div class="avatar"><img src="img/`+i+`.PNG" alt=""></div>
                    <div class="box">
                      <div class="head-box">
                       <h6 class="comment-name by-author"><a href="">`+com.user+`</a></h6>
                        <span>`+com.dateTime+`&nbsp; &nbsp;</span>`
            
                        htmlContentToAppend += `<span><form action="">`
                for (let j = 5; j >= 1; j--) {
                    if (com.score != j)
                        htmlContentToAppend += ` <input type="radio"name="` + i + `" class="star star` + j + `" id="star` + j + `"disabled><label for="star` + j + `" class="star star` + j + `"></label>`;
                    else
                        htmlContentToAppend += `<input type="radio"name="` + i + `" class="star star` + j + `" id="star` + j + `" checked disabled><label for="star` + j + `" class="star star` + j + `"></label>`;
                }
                htmlContentToAppend += `<br></form></span>
                        <i class="fa fa-reply" aria-hidden="true"></i>
                        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                        </div>
                      <div class="content">
                        `+com.description+`
                      </div>
                    </div>
                  </div>
                  </li>
                </ul>
            
                `
               document.getElementById("comentarios").innerHTML = htmlContentToAppend;
                       
            }
        }
    });
   
}); 
document.getElementById("comentar").addEventListener("click", function(e){
    e.preventDefault();
    location.reload();
        
});

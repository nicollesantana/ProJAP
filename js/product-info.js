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

            // let categoryNameHTML  = document.getElementById("comScore");
            // let categoryDescriptionHTML = document.getElementById("categoryDescription");
            // let productCountHTML = document.getElementById("productCount");
            // let productCriteriaHTML = document.getElementById("productCriteria");
           
        
            // categoryNameHTML.innerHTML = comentarios.score;
            // categoryDescriptionHTML.innerHTML = comentarios.description;
            // productCountHTML.innerHTML = comentarios.user;
            // productCriteriaHTML.innerHTML = comentarios.dateTime;
          
            let htmlContentToAppend = "";

            for(let i = 0; i < comentarios.length; i++){
                let com = comentarios[i];
        
                htmlContentToAppend += `
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="` + com.score + `" alt="">
                    </div>
                </div>
                `
        
                document.getElementById("comentarios").innerHTML = htmlContentToAppend;
                       
            }
        }
    });
}); 
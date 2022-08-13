const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
const btnInput = document.querySelector(".btnInput");

let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  /*btnInput.addEventListener("click", searchZapatilla);*/
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito();
  }
  
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("js/api.json");
    const data = await res.json();
    /* console.log(data); */
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCards = (data) => {
  /* console.log(data); */
  data.forEach((producto) => {
    /* console.log(producto); */
    templateCard.querySelector("h4").textContent = producto.marca;
    templateCard.querySelector("h5").textContent = producto.modelo;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard.querySelector("img").setAttribute("src", producto.img);
    templateCard.querySelector(".btn-add").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addCarrito = (e) => {
  /* console.log(e.target);
  console.log(e.target.classList.contains('btn-small')); */
  if (e.target.classList.contains("btn-add")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (objeto) => {
  /* console.log(objeto); */
  const producto = {
    id: objeto.querySelector(".btn-add").dataset.id,
    marca: objeto.querySelector("h4").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };
  pintarCarrito();
};

const pintarCarrito = () => {
  /* console.log(carrito); */
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.marca;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  pintarFooter();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - Añada characters!</th>`;
    return;
  }
  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  /* console.log(nPrecio); */

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
});
  const btnComprar = document.getElementById("comprar-carrito");
  btnComprar.addEventListener("click", () => {
    carrito = {};
  pintarCarrito();
  });
};

const btnAccion = (e) => {
  /* console.log(e.target);*/
  //Accion de aumentar
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }
  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
  }
  e.stopPropagation();
};

/* const templateCard = document.getElementById("template-card").content; */
const zapaCardTemplate = document.getElementById("template-card")
conzapa = document.getElementById("cards")
const searchInput = document.querySelector("[data-search]")

let zapas = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  zapas.forEach(zapa => {
    const isVisible =
      zapa.modelo.toLowerCase().includes(value) ||
      zapa.precio.toLowerCase().includes(value)
    zapa.element.classList.toggle("hide", !isVisible)
  })
})

fetch("js/api.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(zapa => {
      const card = zapaCardTemplate.content.cloneNode(true).children[0]
      console.log(zapa)
    })
    zapas = data.map(zapa => {
      const card = zapaCardTemplate.content.cloneNode(true).children[0]
      const title = card.querySelector("h4")
      const header = card.querySelector("h5")
      const image = card.querySelector("img")
      const body = card.querySelector("p")

      image.setAttribute('src', zapa.img)
      title.textContent = zapa.marca
      header.textContent = zapa.modelo
      body.textContent = zapa.precio
      zapaCardContainer.append(card)
      return { modelo: zapa.modelo, precio: zapa.precio, img: zapa.img, element: card }
      
    })
  })

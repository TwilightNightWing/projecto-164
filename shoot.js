AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBullet();
    },

    shootBullet: function () {
        window.addEventListener("keydown", (e) => {
          if (e.key === "z") {
            var bullet = document.createElement("a-entity");
    
            bullet.setAttribute("geometry", {
              primitive: "sphere",
              radius: 0.1,
            });
    
            bullet.setAttribute("material", "color", "black");
    
            var cam = document.querySelector("#camera-rig");
            pos = cam.getAttribute("position");
    
            bullet.setAttribute("position", {
              x: pos.x,
              y: pos.y + 1,
              z: pos.z - 0.5,
            });
    
            var camera = document.querySelector("#camera").object3D;
    
            //Obtener la dirección de la cámara como vector Three.js 
            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
    
            //Establecer la velocidad y su dirección
            bullet.setAttribute("velocity", direction.multiplyScalar(-50));
    
            var scene = document.querySelector("#scene");
    
            //Establecer las balas como entidades dinámicas
            bullet.setAttribute("dynamic-body", {
              shape: "sphere",
              mass: "50",
            });
    
            //Agregar el evento de escucha de colisión a la bala
            bullet.addEventListener("collide", this.removeBullet);
    
            scene.appendChild(bullet);
    
            //Sonido de disparo
            this.shootSound();
          }
        });
      },
})
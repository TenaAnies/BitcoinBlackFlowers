function ocmCallback() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setClearColor(0xffffff); // Sets the background color to white
    renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(renderer.domElement);

    function generateRandomFlower(count, xOri, yOri, zOri, min, max, distanceSquaredThreshold, coneBase, coneHeight, conseSides)  {
        for (let i = 0; i < count; i++) {
            // Random X-Y-Z-coordinates within the specified range
            const minRange = min * 2 * Math.PI
            const maxRange = max * 2 * Math.PI
            const x = Math.random() * (maxRange - minRange) + minRange;
            const y = Math.random() * (maxRange - minRange) + minRange;
            const z = Math.random() * (maxRange - minRange) + minRange;

            // Calculate the square of the Euclidean distance
            const distanceSquared = x * x + y * y + z * z;

            if (distanceSquared <= distanceSquaredThreshold) {
                // Create the cone geometry
                const coneGeometry = new THREE.ConeGeometry(coneBase, coneHeight, conseSides);

                // Create a random grey color for each cone
                const floatColor = 0.0 + Math.random() * (1.0 - 0.0);
                const threeColor = new THREE.Color();
                const material = new THREE.MeshBasicMaterial({ color: threeColor.setScalar(floatColor) });

                // Create a mesh and position it
                const cone = new THREE.Mesh(coneGeometry, material);
                cone.position.set(xOri, yOri, zOri);
                cone.rotation.set(xOri+x, yOri+y, zOri+z);

            // Add the cone to the scene
            scene.add(cone);
            }
        }
    }

    // Function to generate random x, y, z coordinates within a specified range
    function getRandomCoordinates(minX, maxX, minY, maxY, minZ, maxZ) {
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        const z = Math.random() * (maxZ - minZ) + minZ;
        return { x, y, z };
    }

    for (let i = 0; i < 5; i++) {
        const randomCoordinates = getRandomCoordinates(-8, 8, -8, 8, -1.5, 1.5);
        generateRandomFlower(9660, randomCoordinates.x, randomCoordinates.y, randomCoordinates.z, -1, 1, 5.69 * 2 * Math.PI, 0.004, 4, 16);
    }

    // Define some variables for camera animation
    let cameraRadius = 5; // Radius of the circular path
    let cameraSpeed = 0.1; // Speed of the camera's movement
    let cameraAngle = 0; // Current angle of the camera
    camera.position.z = 20;

    function animate() {
        requestAnimationFrame(animate);

        // Calculate the new camera position
        camera.position.x = cameraRadius * Math.cos(cameraAngle);
        camera.position.y = cameraRadius * Math.sin(cameraAngle);

        // Update the camera angle for the next frame
        cameraAngle += cameraSpeed;

        // Make the camera look at the center of your 3D scene
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
    document.querySelector("#scene").appendChild(renderer.domElement);
}
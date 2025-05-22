useEffect(() => {
  fetch('http://localhost:3001/cars')
    .then(res => res.json())
    .then(data => setPlateNumbers(data.map(car => car.PlateNumber)))
    .catch(() => setPlateNumbers([]));
  // ...fetch service codes as before
}, []);
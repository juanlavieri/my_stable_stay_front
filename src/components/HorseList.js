// Accessibility improvements in HorseList.js

function HorseList() {
  // ... existing code

  return (
    <div>
      <h2>Horses</h2>
      <ul aria-label="List of horses">
        {horses.map((horse) => (
          <li key={horse.id}>
            <h3>{horse.name}</h3>
            <p>Breed: {horse.breed}</p>
            <p>Age: {horse.age}</p>
            // ... other horse details
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HorseList;

export default function User({ name, age, description }) {
    return (
        <div className="user">
            <h1 id="nameUser">{name}</h1>
            <h2 id="ageUser">{age}</h2>
            <p id="description">{description}</p>
        </div>
    );
}

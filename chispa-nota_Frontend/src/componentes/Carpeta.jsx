import { useState } from 'react';
import { BiFolder } from 'react-icons/bi';

function Carpeta({ onCreateFolder }) {
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (!creatingFolder) {
      setCreatingFolder(true);
      onCreateFolder(folderName); // Pasar el nombre de la carpeta al crearla
    }
  };

  const handleChange = (e) => {
    setFolderName(e.target.value); // Actualizar el nombre de la carpeta mientras se edita
  };

  return (
    <div onClick={handleCreateFolder} style={{ cursor: 'pointer' }}>
      <BiFolder size={48} color="black" />
      {creatingFolder ? (
        <input
          type="text"
          value={folderName}
          autoFocus
          onChange={handleChange}
          onBlur={() => setCreatingFolder(false)}
          onKeyDown={(e) => e.key === 'Enter' && setCreatingFolder(false)}
        />
      ) : (
        <p>{folderName}</p>
      )}
    </div>
  );
}

export default Carpeta;

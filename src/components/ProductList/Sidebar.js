import { useState } from 'react';

const Sidebar = ({ material, setMaterial, onClick }) => {
  const [checked, setChecked] = useState(null);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === checked) {
      setChecked(null);
      onClick();
    } else {
      setChecked(name);
      const price = value.split(' ');
      onClick(price[0], price[1]);
    }
  };

  const handleMaterialChange = (e) => {
    const { name, checked } = e.target;

    if (name === 'steel') {
      if (checked) {
        setMaterial([...material, { value: 'Stainless Steel' }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== 'Stainless Steel';
          })
        );
      }
    }

    if (name === 'leather') {
      if (checked) {
        setMaterial([...material, { value: 'Leather' }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== 'Leather';
          })
        );
      }
    }

    if (name === 'fabric') {
      if (checked) {
        setMaterial([...material, { value: 'Fabric' }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== 'Fabric';
          })
        );
      }
    }

    if (name === '12 mm') {
      if (checked) {
        setMaterial([...material, { value: name }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== name;
          })
        );
      }
    }

    if (name === '14 mm') {
      if (checked) {
        setMaterial([...material, { value: name }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== name;
          })
        );
      }
    }

    if (name === '16 mm') {
      if (checked) {
        setMaterial([...material, { value: name }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== name;
          })
        );
      }
    }

    if (name === '18 mm') {
      if (checked) {
        setMaterial([...material, { value: name }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== name;
          })
        );
      }
    }

    if (name === '20 mm') {
      if (checked) {
        setMaterial([...material, { value: name }]);
      } else {
        setMaterial(
          material.filter((item) => {
            return item.value !== name;
          })
        );
      }
    }
  };

  return (
    <div className="hidden lg:block">
      <div className="border">
        <div className="border-b-2">
          <div className="py-2 px-4 ">
            <h5 className="text-2xl italic font-medium tracking-widest">
              Filters
            </h5>
          </div>
        </div>
        <div className="py-3 px-4">
          <h6 className="py-1 font-semibold text-lg tracking-wider bg-gray-100">
            Material
          </h6>
          <form>
            <div className="pt-3">
              <input
                name="steel"
                type="checkbox"
                onChange={handleMaterialChange}
              />
              <label className="ml-3 tracking-wider">Stainless steel</label>
            </div>
            <div className="pt-1">
              <input
                onChange={handleMaterialChange}
                name="leather"
                type="checkbox"
              />
              <label className="ml-3 tracking-wider">Leather</label>
            </div>
            <div className="pt-1">
              <input
                name="fabric"
                type="checkbox"
                onChange={handleMaterialChange}
              />
              <label className="ml-3 tracking-wider">Fabric</label>
            </div>
          </form>
        </div>

        <div className="pt-2 px-4">
          <h6 className="py-1 font-semibold text-lg tracking-wider bg-gray-100">
            Price
          </h6>
          <div className="pt-3">
            <input
              type="checkbox"
              name="checkbox1"
              value="0 4995"
              checked={checked === 'checkbox1'}
              onChange={handlePriceChange}
            />
            <label className="ml-3 tracking-wider">Under ₹4995</label>
          </div>
          <div className="pt-1">
            <input
              type="checkbox"
              name="checkbox2"
              value="4995 7994"
              checked={checked === 'checkbox2'}
              onChange={handlePriceChange}
            />
            <label className="ml-3 tracking-wider">₹4995-₹7994</label>
          </div>
          <div className="pt-1">
            <input
              type="checkbox"
              name="checkbox3"
              value="7995 9994"
              checked={checked === 'checkbox3'}
              onChange={handlePriceChange}
            />
            <label className="ml-3 tracking-wider"> ₹7995-₹9994</label>
          </div>
          <div className="pt-1">
            <input
              type="checkbox"
              name="checkbox4"
              value="9995 0"
              checked={checked === 'checkbox4'}
              onChange={handlePriceChange}
            />
            <label className="ml-3 tracking-wider">₹9995 and Above</label>
          </div>
        </div>

        <div className="pt-3 px-4">
          <h6 className="py-1 font-semibold text-lg tracking-wider bg-gray-100">
            Strap size
          </h6>
          <div className="pt-3">
            <input
              name="12 mm"
              type="checkbox"
              onChange={handleMaterialChange}
            />
            <label className="ml-3 tracking-wider">12 mm</label>
          </div>
          <div className="pt-1">
            <input
              name="14 mm"
              type="checkbox"
              onChange={handleMaterialChange}
            />
            <label className="ml-3 tracking-wider">14 mm</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">16mm</label>
          </div>
          <div className="pt-1">
            <input
              name="18 mm"
              type="checkbox"
              onChange={handleMaterialChange}
            />
            <label className="ml-3 tracking-wider">18 mm</label>
          </div>
          <div className="pt-1 pb-2">
            <input
              name="20 mm"
              type="checkbox"
              onChange={handleMaterialChange}
            />
            <label className="ml-3 tracking-wider">20 mm</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

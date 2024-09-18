import "./Menu.css"; // Para estilos adicionales

const Menu = () => {
  return (
    <div className="container mt-5">
      <h2>Menú</h2>
      <div className="row">
        {/* Producto 1 */}
        <div className="col-md-6">
          <div className="card">
            <img
              src="/images/burguer_1.pjg"
              className="card-img-top"
              alt="Hamburguesa Clásica"
            />
            <div className="card-body">
              <h5 className="card-title">Hamburguesa Clásica</h5>
              <p className="card-text">
                Deliciosa hamburguesa clásica con todos los ingredientes.
              </p>
            </div>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="col-md-6">
          <div className="card">
            <img
              src="/images/hamburguesa_premium.png"
              className="card-img-top"
              alt="Hamburguesa Premium"
            />
            <div className="card-body">
              <h5 className="card-title">Hamburguesa Premium</h5>
              <p className="card-text">
                Hamburguesa premium con ingredientes seleccionados.
              </p>
            </div>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="col-md-6 mt-4">
          <div className="card">
            <img
              src="/images/perro_caliente_clasico.png"
              className="card-img-top"
              alt="Perro Caliente Clásico"
            />
            <div className="card-body">
              <h5 className="card-title">Perro Caliente Clásico</h5>
              <p className="card-text">
                El clásico perro caliente con salsa y papitas.
              </p>
            </div>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="col-md-6 mt-4">
          <div className="card">
            <img
              src="/images/perro_caliente_premium.png"
              className="card-img-top"
              alt="Perro Caliente Premium"
            />
            <div className="card-body">
              <h5 className="card-title">Perro Caliente Premium</h5>
              <p className="card-text">
                Perro caliente premium con ingredientes gourmet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

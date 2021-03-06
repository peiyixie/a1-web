import dva from "dva";
import "./index.css";

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
//buyer
app.model(require("./models/buyerData").default);
app.model(require("./models/navigator").default);

//seller
app.model(require("./models/sellerData").default);
app.model(require("./models/navigatorSeller").default);

//admin
app.model(require("./models/navigatorAdmin").default);
app.model(require("./models/adminData").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

import {
  LOAD_USER,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  ADD_STORE,
  DELETE_STORE,
  ADD_TEMPLATE,
  DELETE_TEMPLATE,
  UPDATE_TEMPLATE,
} from "../actionTypes.js";

const currentUser = (state = initialUserInfo, action) => {
  switch (action.type) {
    case LOAD_USER: {
      const userData = action.payload;
      return userData;
    }

    case ADD_CATEGORY: {
      const categoryName = action.payload;
      return {
        ...state,
        config: {
          categories: [...state.config.categories, categoryName],
          stores: [...state.config.stores],
          templates: [...state.config.templates],
        },
      };
    }

    case DELETE_CATEGORY: {
      const categoryName = action.payload;
      return {
        ...state,
        config: {
          categories: state.config.categories.filter(
            (item) => item != categoryName
          ),
          stores: [...state.config.stores],
          templates: [...state.config.templates],
        },
      };
    }

    case ADD_STORE: {
      const storeName = action.payload;
      return {
        ...state,
        config: {
          categories: [...state.config.categories],
          stores: [...state.config.stores, storeName],
          templates: [...state.config.templates],
        },
      };
    }

    case DELETE_STORE: {
      const storeName = action.payload;
      return {
        ...state,
        config: {
          categories: [...state.config.categories],
          stores: state.config.stores.filter((item) => item != storeName),
          templates: [...state.config.templates],
        },
      };
    }

    case ADD_TEMPLATE: {
      const templateObject = action.payload;
      return {
        ...state,
        config: {
          categories: [...state.config.categories],
          stores: [...state.config.stores],
          templates: [...state.config.templates, templateObject],
        },
      };
    }

    case DELETE_TEMPLATE: {
      const templateId = action.payload;
      return {
        ...state,
        config: {
          categories: [...state.config.categories],
          stores: [...state.config.stores],
          templates: state.config.templates.filter(
            (item) => item.templateId !== templateId
          ),
        },
      };
    }

    case UPDATE_TEMPLATE: {
      const templateData = action.payload;

      return {
        ...state,
        config: {
          categories: [...state.config.categories],
          stores: [...state.config.stores],
          templates: state.config.templates.map((item) => {
            if (item.templateId === templateData.templateId) {
              return templateData;
            }
            return item;
          }),
        },
      };
    }

    default:
      return state;
  }
};

export default currentUser;

const initialUserInfo = {
  userId: "",
  name: "",
  email: "",
  config: {
    categories: [],
    stores: [],
  },
};

import Container from "../Shared/Navber/Container";
import CategoryBox from "./CategoryBox";
import { categories } from "./categoriesData";

const Categories = () => {
    return (
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item, ind) => (
            <CategoryBox key={ind} label={item.label} icon={item.icon} />
          ))}
        </div>
      </Container>
    );
};

export default Categories;
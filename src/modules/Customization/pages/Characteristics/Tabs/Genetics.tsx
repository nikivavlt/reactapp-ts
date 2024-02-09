import React from 'react';

const maleParents = [
  { 'id': '00', 'name': 'Бенжамин'},
  { 'id': '01', 'name': 'Даниэль'},
  { 'id': '02', 'name': 'Джошуа'},
  { 'id': '03', 'name': 'Ной'},
  { 'id': '04', 'name': 'Эндрю'},
  { 'id': '05', 'name': 'Джоан'},
  { 'id': '06', 'name': 'Алекс'},
  { 'id': '07', 'name': 'Исаак'},
  { 'id': '08', 'name': 'Эван'},
  { 'id': '09', 'name': 'Итан'},
  { 'id': '10', 'name': 'Винцент'},
  { 'id': '11', 'name': 'Ангел'},
  { 'id': '12', 'name': 'Диего'},
  { 'id': '13', 'name': 'Адриан'},
  { 'id': '14', 'name': 'Габриэль'},
  { 'id': '15', 'name': 'Мишель'},
  { 'id': '16', 'name': 'Сантьяго'},
  { 'id': '17', 'name': 'Кевин'},
  { 'id': '18', 'name': 'Луис'},
  { 'id': '19', 'name': 'Самуэль'},
  { 'id': '20', 'name': 'Энтони'},
  { 'id': '42', 'name': 'Джон'},
  { 'id': '43', 'name': 'Нико'},
  { 'id': '44', 'name': 'Клауд'}
];
const femaleParents = [
  { 'id': '21', 'name': 'Ханна'},
  { 'id': '22', 'name': 'Одри'},
  { 'id': '23', 'name': 'Жасмин'},
  { 'id': '24', 'name': 'Жизель'},
  { 'id': '25', 'name': 'Амелия'},
  { 'id': '26', 'name': 'Изабелла'},
  { 'id': '27', 'name': 'Зоя'},
  { 'id': '28', 'name': 'Ава'},
  { 'id': '29', 'name': 'Камилия'},
  { 'id': '30', 'name': 'Виолет'},
  { 'id': '31', 'name': 'София'},
  { 'id': '32', 'name': 'Эвелина'},
  { 'id': '33', 'name': 'Николь'},
  { 'id': '34', 'name': 'Эшли'},
  { 'id': '35', 'name': 'Грэйс'},
  { 'id': '36', 'name': 'Бриана'},
  { 'id': '37', 'name': 'Натали'},
  { 'id': '38', 'name': 'Оливиа'},
  { 'id': '39', 'name': 'Элизабет'},
  { 'id': '40', 'name': 'Шарлот'},
  { 'id': '41', 'name': 'Эмма'}
];

const Genetics = () => {
  return (
    <div>
      <div>
        Родители
        <div style={{ display: "flex", overflow: "scroll" }}>
          <ul>
            {maleParents.map((parent) => (
            <li>
              <img src={require(`../../../../../assets/media/images/customization/parents/male/${parent.id}.png`)} alt="Parent" />
              {parent.name}
            </li>
            ))}
          </ul>
          <ul>
            {femaleParents.map((parent) => (
            <li>
              <img src={require(`../../../../../assets/media/images/customization/parents/female/${parent.id}.png`)} alt="Parent" />
              {parent.name}
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Genetics;
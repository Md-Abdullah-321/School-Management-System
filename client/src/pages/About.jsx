import { useSelector } from "react-redux";

function About() {
  const backgroundImage = useSelector((state) => state.home.backgroundImage);

  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <div style={backgroundStyle}>
      <div className="w-full h-full bg-slate-900 opacity-90 text-white p-5 md:p-10">
        <h1 className="text-4xl">About Us</h1>

        <div>
          <h3 className="uppercase font-semibold mt-5">INTRODUCTION:</h3>
          <p className="text-slate-100">
            Tangail polytechnic institute is one of the best polytechnic in
            Bangladesh. it was established in 1991 with only 40 students in the
            1st year classes of diploma -in- engineering in Electrical
            technology with growing demands of mid level technical manpower home
            and abroad the institute has since greatly expanded .
          </p>
        </div>
        <div>
          <h3 className="uppercase font-semibold mt-5">Technology:</h3>
          <p className="text-slate-100">
            The institute now offers 7 technologies:
          </p>
          <ul className="text-slate-100 ml-10">
            <li>1. Computer Technology</li>
            <li>2. Electrical Technology</li>
            <li>3. Civil Technology</li>
            <li>4. Electronics Technology</li>
            <li>5. Construction Technology</li>
            <li>6. Mechanical Technology</li>
            <li>7. Telecommunication Technology</li>
          </ul>
        </div>
        <div>
          <h3 className="uppercase font-semibold mt-5">Location:</h3>
          <p className="text-slate-100">
            The institute is located 1\2 kilometer distence north of Tangail
            center new bus terminal, easterms side, of Tangail - Mymenshingh
            road, in front of two other govt. offices Banbhaan of forest dept.
            B.A.D.C of tangail zone. in the institute premises different green
            trees created calm and quite environment and natural beauty.
          </p>
        </div>
        <div>
          <h3 className="uppercase font-semibold mt-5">Mission: </h3>
          <p className="text-slate-100">
            The mission of Tangail Polytechnic Institute is absolute commitment
            to the highest btainable standard of quality service through
            excellence and concerted efforts of customers, employees and
            shareholders at all levels of corporate activity in the use of
            organizational science and knowledge to solve real life business
            problems.
          </p>
        </div>
        <div>
          <h3 className="uppercase font-semibold mt-5">Vision: </h3>
          <p className="text-slate-100">
            Technical Education are extremely important in improving and
            progressing a nation`s industries while supplying a capable work
            force. The vision of Tangail Polytechnic Institute is to the highest
            obtainable standard of quality service through excellence and
            concerted efforts of customers, employees and shareholders at all
            levels of corporate activity in the use of organizational science
            and knowledge to solve real life business problems.
          </p>
          <p className="text-slate-100 mt-3">
            The education that concerns with the professionalism is called
            Technical education. This education deals practically in the field
            of trade, commerce, agriculture, medicine & Engineering. For above
            purpose Tangail polytechnic was established in 1991 under the
            executive control of the ministry of education, Government of the
            peoples Republic of Bangladesh. It is acting through the Directorate
            of technical Education. The academic programs function under the
            regulation of the Bangladesh Technical education board.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

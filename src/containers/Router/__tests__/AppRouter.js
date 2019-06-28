import React from "react";

import { Redirect } from "react-router-dom";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AppRouter from "../AppRouter";

configure({ adapter: new Adapter() });

let wrapper;

describe("if routes working good", () => {
  beforeEach(() => {
    wrapper = shallow(<AppRouter />);
  });

  it("should have /list route", () => {
    expect(wrapper.find('[path="/list"]')).toHaveLength(1);
  });

  it("should have defined redirect route", () => {
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});

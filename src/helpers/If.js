const If = (statement, $return, $else = '') => {
  return statement ? $return : $else;
}

export default If;
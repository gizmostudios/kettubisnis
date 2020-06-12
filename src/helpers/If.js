const If = (statement, $return, $else = '') => {
  return statement ? ($return || statement) : $else;
}

export default If;
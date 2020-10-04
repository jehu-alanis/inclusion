const controller = {};


controller.menu = (req, res) => {   
     res.render('signin');
    
  
};

controller.index = (req, res) => {   
  res.render('profile');
 

};

///////////////////////formularios///////////////////////////
controller.formulario1 = (req, res) => {   
  res.render('formulario1.ejs');
};

controller.addformulario1 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO alumnos set ?', data, (err, customer) => {
      console.log(customer)
 
      res.redirect('/form2');
     
    })
  })
};

controller.addformulario2 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO datos_escolares set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form3');
    })
  })
};

controller.addformulario3 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tutores set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form4');
    })
  })
};

controller.addformulario4 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO discapacidad set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/busqueda');
    })
  })
};
///////////relleno///////////////////////////////////////////////////////////////////////////////////////////////////////
controller.form2 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  alumnos  ORDER BY idalumnos DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario2', {
        data: rows[0],
        
      })
    });
  });
};

controller.form3 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  datos_escolares  ORDER BY iddatos_escolares DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario3', {
        data: rows[0]
      })
    });
  });
};

controller.form4 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  tutores   ORDER BY idtutores DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario4', {
        data: rows[0]
      })
    });
  });
};


controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    
    conn.query("SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula ",  (err, customers) => {
      res.render('busqueda', {
        data: customers
     });
    });
  });
};


controller.ver = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula WHERE matricula = ?  ", [matricula], 
    (err, rows) => {
      res.render('pdf', {
        data: rows[0]
      })
    });
  });
};



controller.editar = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, conn) => {
  conn.query("SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula WHERE matricula = ? ", [matricula],  (err, rows) => {
      res.render('editar', {
        data: rows[0]
     });
    });
  });
};



controller.consultasexo= (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT SUM(CASE WHEN Sexo= 'MASCULINO' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN Sexo= 'FEMENINO' THEN 1 ELSE 0 END) a2 FROM alumnos " ,  (err, rows) => {
      
      res.render('consultagrafica', {
        data: rows[0]
      }) 
    });
  });    
 };

 controller.consultacampus= (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT SUM(CASE WHEN campus= 'xalapa' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN campus= 'xico' THEN 1 ELSE 0 END) a2, SUM(CASE WHEN campus= 'rinconada' THEN 1 ELSE 0 END) a3 FROM datos_escolares " ,  (err, rows) => {
      
      res.render('consultagrafica2', {
        data: rows[0]
      }) 
    });
  });    
 };


 controller.consultacarrera= (req, res) => {
  req.getConnection((err, conn) => {
conn.query("SELECT SUM(CASE WHEN carrera= 'ING. SISTEMAS COMPUTACIONALES' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN carrera= 'ING. GESTION EMPRESARIAL' THEN 1 ELSE 0 END) a2, SUM(CASE WHEN carrera= 'ING. CIVIL' THEN 1 ELSE 0 END) a3, SUM(CASE WHEN carrera= 'ING. BIOQUÍMICA' THEN 1 ELSE 0 END) a4, SUM(CASE WHEN carrera= 'ING. ELECTROMECÁNICA' THEN 1 ELSE 0 END) a5, SUM(CASE WHEN carrera= 'ING. MECATRÓNICA' THEN 1 ELSE 0 END) a6, SUM(CASE WHEN carrera= 'ING. INDUSTRIAL' THEN 1 ELSE 0 END) a7, SUM(CASE WHEN carrera= 'ING. ELECTRÓNICA' THEN 1 ELSE 0 END) a8, SUM(CASE WHEN carrera= 'LIC. GASTRONOMIA' THEN 1 ELSE 0 END) a9, SUM(CASE WHEN carrera= 'ING. EN INDUSTRIAS ALIMENTARIAS' THEN 1 ELSE 0 END) a10 FROM datos_escolares " ,  (err, rows) => {
      
      res.render('consgraf', {
        data: rows[0]
      }) 
    });
  });    
 };

 
 controller.update1 = (req, res) => {
  const { matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {
  conn.query('UPDATE alumnos set ? where matricula = ?', [newCustomer, matricula], (err, rows) => {
    res.redirect('/busqueda');
  });
  });
};


controller.update2 = (req, res) => {
  const { no_control } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE datos_escolares set ? where no_control = ?', [newCustomer, no_control], (err, rows) => {
    res.redirect('/busqueda');
      });
  });
};

controller.update3 = (req, res) => {
  const { id_hijo_matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE tutores set ? where id_hijo_matricula = ?', [newCustomer, id_hijo_matricula], (err, rows) => {
    res.redirect('/busqueda');
  });
  });
};

controller.update4 = (req, res) => {
  const { id_matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE discapacidad set ? where id_matricula  = ?', [newCustomer, id_matricula], (err, rows) => {
    res.redirect('/busqueda');
  });
  });
};


controller.delete = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM alumnos WHERE matricula = ?', [matricula], (err, rows) => {
      res.redirect('/busqueda');
    });
  });
}


/////////////////////////////////////////////////XICO/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////XICO//////////////////////////////////////////////////
/////////////////////////////////////////////////XICO//////////////////////////////////////////////////
/////////////////////////////////////////////////XICO//////////////////////////////////////////////////
/////////////////////////////////////////////////XICO//////////////////////////////////////////////////
/////////////////////////////////////////////////XICO//////////////////////////////////////////////////
/////////////////////////////////////////////////XICO//////////////////////////////////////////////////
/////////////////////////////////////////////////XICO//////////////////////////////////////////////////


controller.index2 = (req, res) => {   
  res.render('profilexico');
};

controller.formulario11 = (req, res) => {   
  res.render('formulario11.ejs');
};

controller.addformulario11 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO alumnos set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form22');
    })
  })
};

controller.addformulario22 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO datos_escolares set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form33');
    })
  })
};

controller.addformulario33 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tutores set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form44');
    })
  })
};

controller.addformulario44 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO discapacidad set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/busqueda2');
    })
  })
};
///////////relleno///////////////////////////////////////////////////////////////////////////////////////////////////////
controller.form22 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  alumnos  ORDER BY idalumnos DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario22', {
        data: rows[0]
      })
    });
  });
};

controller.form33 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  datos_escolares  ORDER BY iddatos_escolares DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario33', {
        data: rows[0]
      })
    });
  });
};

controller.form44 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  tutores   ORDER BY idtutores DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario44', {
        data: rows[0]
      })
    });
  });
};


controller.list2 = (req, res) => {
  req.getConnection((err, conn) => {
    const campus = "xico";
    conn.query("SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula  WHERE campus = ?",[campus],  (err, customers) => {
      res.render('busqueda2', {
        data: customers
     });
    });
  });
};


controller.ver2 = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula WHERE matricula = ?  ", [matricula], 
    (err, rows) => {
      res.render('pdf2', {
        data: rows[0]
      })
    });
  });
};



controller.editar2 = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, conn) => {
  conn.query("SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula WHERE matricula = ? ", [matricula],  (err, rows) => {
      res.render('editar2', {
        data: rows[0]
     });
    });
  });
};



controller.consultasexo2 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT SUM(CASE WHEN Sexo= 'MASCULINO' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN Sexo= 'FEMENINO' THEN 1 ELSE 0 END) a2 FROM alumnos " ,  (err, rows) => {
      
      res.render('consultagrafica3', {
        data: rows[0]
      }) 
    });
  });    
 };

 controller.consultacampus2 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT SUM(CASE WHEN campus= 'xalapa' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN campus= 'xico' THEN 1 ELSE 0 END) a2, SUM(CASE WHEN campus= 'rinconada' THEN 1 ELSE 0 END) a3 FROM datos_escolares " ,  (err, rows) => {
      
      res.render('consultagrafica4', {
        data: rows[0]
      }) 
    });
  });    
 };

 controller.consultacarrera2= (req, res) => {
  req.getConnection((err, conn) => {
conn.query("SELECT SUM(CASE WHEN carrera= 'ING. SISTEMAS COMPUTACIONALES' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN carrera= 'ING. GESTION EMPRESARIAL' THEN 1 ELSE 0 END) a2, SUM(CASE WHEN carrera= 'ING. CIVIL' THEN 1 ELSE 0 END) a3, SUM(CASE WHEN carrera= 'ING. BIOQUÍMICA' THEN 1 ELSE 0 END) a4, SUM(CASE WHEN carrera= 'ING. ELECTROMECÁNICA' THEN 1 ELSE 0 END) a5, SUM(CASE WHEN carrera= 'ING. MECATRÓNICA' THEN 1 ELSE 0 END) a6, SUM(CASE WHEN carrera= 'ING. INDUSTRIAL' THEN 1 ELSE 0 END) a7, SUM(CASE WHEN carrera= 'ING. ELECTRÓNICA' THEN 1 ELSE 0 END) a8, SUM(CASE WHEN carrera= 'LIC. GASTRONOMIA' THEN 1 ELSE 0 END) a9, SUM(CASE WHEN carrera= 'ING. EN INDUSTRIAS ALIMENTARIAS' THEN 1 ELSE 0 END) a10 FROM datos_escolares " ,  (err, rows) => {
      
      res.render('consgraf2', {
        data: rows[0]
      }) 
    });
  });    
 };

 
 controller.update11 = (req, res) => {
  const { matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE alumnos set ? where id = ?', [newCustomer, matricula], (err, rows) => {
    res.redirect('/busqueda2');
  });
  });
};


controller.update22 = (req, res) => {
  const { no_control } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE datos_escolares set ? where id = ?', [newCustomer, no_control], (err, rows) => {
    res.redirect('/busqueda2');
      });
  });
};

controller.update33 = (req, res) => {
  const { id_hijo_matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE tutores set ? where id = ?', [newCustomer, id_hijo_matricula], (err, rows) => {
    res.redirect('/busqueda2');
  });
  });
};

controller.update44 = (req, res) => {
  const { id_matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE discapacidad set ? where id = ?', [newCustomer, id_matricula], (err, rows) => {
    res.redirect('/busqueda2');
  });
  });
};


controller.delete2 = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM alumnos WHERE matricula = ?', [matricula], (err, rows) => {
      res.redirect('/busqueda2');
    });
  });
}


////////////////////////////////////////RINCONADA/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////RINCONADA/////////////////////////////////////////////////
//////////////////////////////////////////RINCONADA//////////////////////////////////////////////
//////////////////////////////////////////////RINCONADA/////////////////////////////////////////////////
/////////////////////////////////////////////RINCONADA//////////////////////////////////////////////
/////////////////////////////////////////////RINCONADA////////////////////////////////////////////////
//////////////////////////////////////////////RINCONADA////////////////////////////////////////////////
//////////////////////////////////////////////RINCONADA//////////////////////////////////////////////

controller.index3 = (req, res) => {   
  res.render('profilerinconada');
};

controller.formulario111 = (req, res) => {   
  res.render('formulario111.ejs');
};

controller.addformulario111 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO alumnos set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form222');
    })
  })
};

controller.addformulario222 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO datos_escolares set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form333');
    })
  })
};

controller.addformulario333 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tutores set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/form444');
    })
  })
};

controller.addformulario444 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO discapacidad set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/busqueda3');
    })
  })
};
///////////relleno///////////////////////////////////////////////////////////////////////////////////////////////////////
controller.form222 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  alumnos  ORDER BY idalumnos DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario222', {
        data: rows[0]
      })
    });
  });
};

controller.form333 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  datos_escolares  ORDER BY iddatos_escolares DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario333', {
        data: rows[0]
      })
    });
  });
};

controller.form444 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  tutores   ORDER BY idtutores DESC LIMIT 0, 1 ",  
    (err, rows) => {
      res.render('formulario444', {
        data: rows[0]
      })
    });
  });
};


controller.list3 = (req, res) => {
  req.getConnection((err, conn) => {
    const campus = "rinconada";
    conn.query("SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula  WHERE campus = ?",[campus],  (err, customers) => {
      res.render('busqueda3', {
        data: customers
     });
    });
  });
};


controller.ver3 = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula WHERE matricula = ?  ", [matricula], 
    (err, rows) => {
      res.render('pdf3', {
        data: rows[0]
      })
    });
  });
};



controller.editar3 = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, conn) => {
  conn.query("SELECT *  FROM alumnos INNER JOIN datos_escolares  ON alumnos.matricula = datos_escolares.no_control INNER JOIN tutores  ON datos_escolares.no_control = tutores.id_hijo_matricula INNER JOIN discapacidad  ON tutores.id_hijo_matricula = discapacidad.id_matricula WHERE matricula = ? ", [matricula],  (err, rows) => {
      res.render('editar3', {
        data: rows[0]
     });
    });
  });
};



controller.consultasexo3 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT SUM(CASE WHEN Sexo= 'MASCULINO' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN Sexo= 'FEMENINO' THEN 1 ELSE 0 END) a2 FROM alumnos " ,  (err, rows) => {
      
      res.render('consultagrafica5', {
        data: rows[0]
      }) 
    });
  });    
 };

 controller.consultacampus3 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT SUM(CASE WHEN campus= 'xalapa' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN campus= 'xico' THEN 1 ELSE 0 END) a2, SUM(CASE WHEN campus= 'rinconada' THEN 1 ELSE 0 END) a3 FROM datos_escolares " ,  (err, rows) => {
      
      res.render('consultagrafica6', {
        data: rows[0]
      }) 
    });
  });    
 };

 controller.consultacarrera3= (req, res) => {
  req.getConnection((err, conn) => {
conn.query("SELECT SUM(CASE WHEN carrera= 'ING. SISTEMAS COMPUTACIONALES' THEN 1 ELSE 0 END) a1, SUM(CASE WHEN carrera= 'ING. GESTION EMPRESARIAL' THEN 1 ELSE 0 END) a2, SUM(CASE WHEN carrera= 'ING. CIVIL' THEN 1 ELSE 0 END) a3, SUM(CASE WHEN carrera= 'ING. BIOQUÍMICA' THEN 1 ELSE 0 END) a4, SUM(CASE WHEN carrera= 'ING. ELECTROMECÁNICA' THEN 1 ELSE 0 END) a5, SUM(CASE WHEN carrera= 'ING. MECATRÓNICA' THEN 1 ELSE 0 END) a6, SUM(CASE WHEN carrera= 'ING. INDUSTRIAL' THEN 1 ELSE 0 END) a7, SUM(CASE WHEN carrera= 'ING. ELECTRÓNICA' THEN 1 ELSE 0 END) a8, SUM(CASE WHEN carrera= 'LIC. GASTRONOMIA' THEN 1 ELSE 0 END) a9, SUM(CASE WHEN carrera= 'ING. EN INDUSTRIAS ALIMENTARIAS' THEN 1 ELSE 0 END) a10 FROM datos_escolares " ,  (err, rows) => {
      
      res.render('consgraf3', {
        data: rows[0]
      }) 
    });
  });    
 };

 
 controller.update111 = (req, res) => {
  const { matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE alumnos set ? where id = ?', [newCustomer, matricula], (err, rows) => {
    res.redirect('/busqueda3');
  });
  });
};


controller.update222 = (req, res) => {
  const { no_control } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE datos_escolares set ? where id = ?', [newCustomer, no_control], (err, rows) => {
    res.redirect('/busqueda3');
      });
  });
};

controller.update333 = (req, res) => {
  const { id_hijo_matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE tutores set ? where id = ?', [newCustomer, id_hijo_matricula], (err, rows) => {
    res.redirect('/busqueda3');
  });
  });
};

controller.update444 = (req, res) => {
  const { id_matricula } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE discapacidad set ? where id = ?', [newCustomer, id_matricula], (err, rows) => {
    res.redirect('/busqueda3');
  });
  });
};


controller.delete3 = (req, res) => {
  const { matricula } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM alumnos WHERE matricula = ?', [matricula], (err, rows) => {
      res.redirect('/busqueda3');
    });
  });
}








module.exports = controller;

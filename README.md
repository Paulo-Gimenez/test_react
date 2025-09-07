refactor a typescript.
    cambios: 
    - refactor a archivos jsx (APP, MAIN, useLocalStorage)

entorno de pruebas
    cambios:
    -se añadio dependencias como vitest y v8 coverage para testear funciones

Componente Counter:
	cambios
		-props tipadas y con valores por defecto
			la idea es que se permita reutilizar el componenete en distintos contextos sin romper tipado
		-estados fuertementes tipados (podian inferir never[])
		-el historial controlado, antes ejecutaba en cada render un loop infinito
			ahora depende de count, el historial solo cambia cuando cambia el contador
		-estado inmutable, antes mutaba el array.
			respeta el inmutabilidad de react y evita bugs
		-conversión explicita en input
			el estado step siempre manejar un number
		-manejo seguro en operacion asincronica 
			evitar errores por estados obsoletos en funciones asincronas

Componente TodoList:
    Cambios realizados:
      -Props tipadas y fuertes (todos, onAddTodo, onToggleTodo, onDeleteTodo, filter, onChangeFilter, totalTodos, -activeCount,completedCount).
      -Estado interno mínimo (newTodoText) y tipado como string.
      -Historial/filtrado calculado desde props para evitar loops y renderizados innecesarios.
      -Estado inmutable: nunca se muta directamente todos.
      -Separación de responsabilidades: lógica de negocio encapsulada en hook useTodos.
      -Filtrado (all, active, completed) gestionado desde el hook, haciendo el componente 100% presentacional.
      -Nombres claros y consistentes, facilitando lectura y testing.
      -Compatible con TypeScript y reusable en distintos contextos.
Hook useTodos
    Cambios realizados:
      -Encapsula toda la lógica de los todos: agregar, eliminar, toggle, filtrado y persistencia en localStorage.
      -Maneja el estado filter (all | active | completed) para que el componente TodoList sea 100% presentacional.
      -Devuelve filteredTodos y contadores (totalTodos, activeCount, completedCount) para simplificar renderizado en UI.
      -Estado inmutable y seguro.

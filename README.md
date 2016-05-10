# mlb-sass
A simple sass library for including any of the 30 Major League Baseball team's colors into your project

## How to Use

1. Add the contents of the mlb-sass directory to your project and include the mlb-sass.scss file at the beginning of your stylesheet like so:

  ```scss
  @import "mlb-sass/mlb-sass";
  ```

2. If you want to include any particular team's color as a property, you can do so by declaring the getTeamColor function:

  ```scss
	//background: getTeamColor($team-name, $index);
	background: getTeamColor(boston-red-sox, 1) // returns the first color associated with the Boston Red Sox
  ```
  `$team-name` is aways the dasherized version of the team's city and nickname (i.e. Boston Red Sox becomes `boston-red-sox`) and `$index` is a number representing the desired color. Note that some teams have more colors than others; you'll get a sass warning if you try to retrieve a color at an index outside the range of a team's colors.

  An alternative to retrieving only one color at a time is including all the team's colors and then using the following syntax to retrive them:

  ```scss
	@include all-team-colors;
	// apply colors with <div class='team-name color-1'>
  ```

## Acknowledgements

All of the colors used in mlb-sass are sourced from [Team Color Codes](http://teamcolorcodes.com/mlb-color-codes/). Thanks for keeping track of things over there, guys!

## About

mlb-sass is maintained by [Conor Britain](www.stbly.com). Please feel free to contribute to the repository, update team colors, and whatever else that will improve the project!
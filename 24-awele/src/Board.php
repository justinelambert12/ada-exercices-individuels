<?php declare(strict_types=1);
final class Board
{
  public function display(): string
  {
    $expectedDisplay = " A "." B "." C "." D "." E "." F "."\n"
      .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(4)')."\n"
      .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(4)')."\n"
      ." G "." H "." I "." J "." K "." L ";
    
    print($expectedDisplay);
    return $expectedDisplay;
  }
}
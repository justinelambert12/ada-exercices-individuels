<?php declare(strict_types=1);
final class Board
{
  private int $seedsInEachPit;
  public function __construct(int $seedsInEachPit=4)
  {
    $this->seedsInEachPit = $seedsInEachPit;
  }

  public function display(): string
  {
    $display = " A "." B "." C "." D "." E "." F "."\n"
      .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '('.$this->seedsInEachPit.')')."\n"
      .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '('.$this->seedsInEachPit.')')."\n"
      ." G "." H "." I "." J "." K "." L ";
    
    print($display);
    return $display;
  }
}